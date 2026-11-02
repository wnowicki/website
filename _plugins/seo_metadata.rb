# Reuse header imagery in jekyll-seo-tag instead of maintaining parallel meta tags.
Jekyll::Hooks.register [:pages, :documents], :pre_render do |page, payload|
  next if page.data["image"]

  post = page.data["layout"] == "post"
  folder = post ? "post-bg" : "bg"
  fallback = post ? "default.jpg" : "main.jpg"
  image = page.data["heading_image"] || fallback
  page.data["image"] = "/assets/img/#{folder}/#{image}"
  payload["page"]["image"] = page.data["image"]
end
