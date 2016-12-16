# ImgChecker, checks for big images and reports back to Travis making the
# build fail. Made with love for FOSSASIA.

# Dependencies
require 'fastimage'

# Program start message
puts "Starting ImgChecker, authored by Abishek V Ashok for FOSSASIA with love"

# Initializing the directories into variables
studentsImgFiles = Dir["./images/students/**/*.*"]
projectsImgFiles = Dir["./images/projects/**/*.*"]
mentorsImgFiles = Dir["./images/mentors/**/*.*"]
iconsImgFiles = Dir["./images/icons/**/*.png"]
logosImgFiles = Dir["./images/logos/**/*.png"]
blogsImgFiles = Dir["./images/blogs/**/*.*"]
logosv2ImgFiles = Dir["./imagees/logos/v2/**/*.*"]

# Defines the standard maximum dimensions for images in each section
studentsImgSize = 240
projectsImgSize = 240
mentorsImgSize = 240
iconsImgSize = 50
blogsImgWidth = 1920
blogsImgHeight = 1080
logosImgWidth = 600
logosImgHeight = 600
logosv2ImgWidth = 600
logosv2ImgHeight = 600

# abortStatus stores status of tests
abortStatus = 0

# Checking images in students section
for studentImage in studentsImgFiles
    size = FastImage.size(studentImage)
    if size[0] > studentsImgSize or size[1] > studentsImgSize
        puts "The image #{studentImage} is larger than #{studentsImgSize}px x #{studentsImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in mentors section
for mentorImage in mentorsImgFiles
    size = FastImage.size(mentorImage)
    if size[0] > mentorsImgSize or size[1] > mentorsImgSize
        puts "The image #{mentorImage} is larger than #{mentorsImgSize}px x #{mentorsImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in projects section
for projectImage in projectsImgFiles
    size = FastImage.size(projectImage)
    if size[0] > projectsImgSize or size[1] > projectsImgSize
        puts "The image #{projectImage} is larger than #{projectsImgSize}px x #{projectsImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in icons section
for iconImage in iconsImgFiles
    size = FastImage.size(iconImage)
    if size[0] > iconsImgSize or size[1] > iconsImgSize
        puts "The image #{iconImage} is larger than #{iconsImgSize}px x #{iconsImgSize}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in logos section
for logoImage in logosImgFiles
    size = FastImage.size(logoImage)
    if size[0] > logosImgWidth or size[1] > logosImgHeight
        puts "The image #{logoImage} is larger than #{logosImgWidth}px x #{logosImgHeight}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in logos section
for logov2Image in logosv2ImgFiles
    size = FastImage.size(logov2Image)
    if size[0] > logosv2ImgWidth or size[1] > logosv2ImgHeight
        puts "The image #{logov2Image} is larger than #{logosv2ImgWidth}px x #{logosv2ImgHeight}px [w x h]"
        abortStatus = 1
    end
end

# Checking images in icon section
for blogImage in blogsImgFiles
    size = FastImage.size(blogImage)
    if size[0] > blogsImgWidth or size[1] > blogsImgHeight
        puts "The image #{blogImage} is larger than #{blogsImgWidth}px x #{blogsImgHeight}px [w x h]"
        abortStatus = 1
    end
end

# Now checking if tests are passed or not
if abortStatus == 1
    puts "ImgChecker: There are images which exceed the expected dimensions as specified above"
    1
    abort("Please resize them sir... Happy coding")
else
    puts "All images are ok... Hurray!"
    0
end
