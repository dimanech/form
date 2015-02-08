# If you have OpenSSL installed, we recommend updating
# the following line to use "https"

source 'http://rubygems.org'

################################################################################
# Requirements
################################################################################

gem "middleman"
gem "compass"
gem "susy"

################################################################################
# Win support
################################################################################

require 'rbconfig'
if RbConfig::CONFIG['target_os'] =~ /mswin|mingw|cygwin/i
  gem 'wdm', '>= 0.1.0'
end

# Cross-templating language block fix for Ruby 1.8
#platforms :mri_18 do
#  gem "ruby18_source_location"
#end