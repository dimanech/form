require 'susy'

################################################################################
# Compass
################################################################################

compass_config do |config|
  config.output_style = :compact
end

################################################################################
# Page options, layouts, aliases and proxies
################################################################################

with_layout :main do
  page "*"
end

# page "index.html", :layout => :front

################################################################################
# Configuration
################################################################################

set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'images'

################################################################################
# Server
################################################################################

#for testing case
#set :port, 80
#sudo middleman server -p 80 -e development

################################################################################
# Helpers
################################################################################

helpers do

  # Renders a stylesheet asset inline.
  def stylesheet_inline( name )
    content_tag :style do
      sprockets[ "#{name}.css" ].to_s
    end
  end

end

################################################################################
# Build
################################################################################

configure :build do
    compass_config do |config|
        config.output_style = :compressed
        config.sass_options = {:debug_info => false}
        config.sass_options = {:line_comments => false}
    end

   set :relative_links, true

   activate :relative_assets
end