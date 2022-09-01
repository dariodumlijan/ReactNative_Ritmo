require_relative 'colorize'

DEPLOY_ANDROID = 'Chimera-Studio/Ritmo-1'
DEPLOY_IOS = 'Chimera-Studio/Ritmo'
DEPLOY_PLATFORM = ARGV[0] == '--ios' ? DEPLOY_IOS : DEPLOY_ANDROID
DEPLOY_ENVIRONMENT = ARGV[1] == '--production' ? 'Production' : 'Staging'

if ARGV.length < 1
  puts
  puts 'Missing platform argument "--android / --ios"'
  puts
  exit
end

if ARGV[0] != '--android' && ARGV[0] != '--ios'
  puts
  puts 'Wrong platform argument, acceptable "--android / --ios"'
  puts
  exit
end

if ARGV[1] == '--promote'
  puts
  system("appcenter codepush promote -a #{DEPLOY_PLATFORM} -s Staging -d Production")
  puts
else
  puts
  puts "Environment: " + " #{DEPLOY_ENVIRONMENT} ".bg_green
  system("appcenter codepush release-react -a #{DEPLOY_PLATFORM} -d #{DEPLOY_ENVIRONMENT}")
  puts
end