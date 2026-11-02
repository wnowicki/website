require "nokogiri"
require "pathname"
require "uri"

root = Pathname.new(ENV.fetch("SITE_DIR", "_site")).expand_path
files = Dir[root.join("**/*.html")]
abort "No built HTML found in #{root}" if files.empty?
documents = files.to_h { |file| [file, Nokogiri::HTML(File.read(file))] }
errors = []

documents.each do |file, document|
  unless document.at_css('meta[http-equiv="refresh"]')
    ["title", 'meta[name="description"]', 'meta[name="author"]', 'link[rel="canonical"]',
     'meta[property="og:image"]', 'meta[property="twitter:image"]', "main"].each do |selector|
      errors << "#{file}: expected exactly one #{selector}" unless document.css(selector).size == 1
    end
    errors << "#{file}: missing document language" if document.at_css("html")["lang"].to_s.empty?
    document.css('meta[property="og:image"], meta[property="twitter:image"]').each do |meta|
      image = URI.parse(meta["content"])
      errors << "#{file}: missing social image #{image}" unless root.join(image.path.delete_prefix("/")).file?
    end
  end
  document.css("a[href], img[src], script[src], link[href], iframe[src]").each do |node|
    value = node["href"] || node["src"]
    next if value.empty? || value.start_with?("//") || value.match?(/\A[a-z][a-z0-9+.-]*:/i)

    path, fragment = value.split("#", 2)
    path = URI::DEFAULT_PARSER.unescape(path.split("?", 2).first.to_s)
    target = if path.empty?
               Pathname.new(file)
             elsif path.start_with?("/")
               root.join(path.delete_prefix("/"))
             else
               Pathname.new(file).dirname.join(path)
             end.cleanpath
    candidates = [target, target.join("index.html"), Pathname.new("#{target}.html")]
    target = candidates.find(&:file?)
    unless target
      errors << "#{Pathname.new(file).relative_path_from(root)}: missing #{value}"
      next
    end
    next if fragment.nil? || fragment.empty? || !documents.key?(target.to_s)

    id = URI::DEFAULT_PARSER.unescape(fragment)
    found = documents[target.to_s].css("[id], a[name]").any? { |element| element["id"] == id || element["name"] == id }
    errors << "#{Pathname.new(file).relative_path_from(root)}: missing fragment #{value}" unless found
  end
end
abort errors.uniq.join("\n") unless errors.empty?
puts "Internal links and fragments passed for #{files.length} files"
