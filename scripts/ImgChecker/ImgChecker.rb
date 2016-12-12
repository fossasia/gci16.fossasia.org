# Image checker, checks for big images and reports back to Travis abandoning the
# build. Made with love for FOSSASIA.

# Dependencies
require 'fastimage'

# Program start message
puts "Starting Image Checker, authored by Abishek V Ashok for FOSSASIA with love"

# Initializing the directories into variables
studentsImgFiles = Dir["./images/students/**/*.jpg"]
projectsImgFiles = Dir["./images/projects/**/*.png"]
mentorsImgFiles = Dir["./images/mentors/**/*.jpg"]
iconsImgFiles = Dir["./images/icons/**/*.png"]
logosImgFiles = Dir["./images/logos/**/*.jpg"]
blogsImgFiles = Dir["./images/blogs/**/*.jpg"]

# Defines the standard maximum dimensions for images in each section
studentsImgSize = 240
projectsImgSize = 240
mentorsImgSize = 240
iconsImgSize = 50
blogsImgSize = 240
logosImgWidth = 400
logosImgHeight = 220

# Checking images in students section
for studentImage in studentsImgFiles
    size = FastImage.size(studentImage)
    if size[0] > studentsImgSize or size[1] > studentsImgSize
        puts "Image size is bigger"
        1
        abort(studentImage)
    end
end

# Checking images in mentors section
for mentorImage in mentorsImgFiles
    size = FastImage.size(mentorImage)
    if size[0] > mentorsImgSize or size[1] > mentorsImgSize
        puts "Image size is bigger"
        1
        abort(mentorImage)
    end
end

# Checking images in projects section
for projectImage in projectsImgFiles
    size = FastImage.size(projectImage)
    if size[0] > projectsImgSize or size[1] > projectsImgSize
        puts "Image size is bigger"
        1
        abort(projectImage)
    end
end

# Checking images in icons section
for iconImage in iconsImgFiles
    size = FastImage.size(iconImage)
    if size[0] > iconsImgSize or size[1] > iconsImgSize
        puts "Image size is bigger"
        1
        abort(iconImage)
    end
end

# Checking images in logos section
for logoImage in logosImgFiles
    size = FastImage.size(logoImage)
    if size[0] > logosImgWidth or size[1] > logosImgHeight
        puts "Image size is bigger"
        1
        abort(logoImage)
    end
end

# Checking images in icon section
for blogImage in blogsImgFiles
    size = FastImage.size(blogImage)
    if size[0] > blogsImgSize or size[1] > blogsImgSize
        puts "Image size is bigger"
        1
        abort(blogImage)
    end
end

# Since all these tests never exited the program we are lucky the tests won
puts "All images are ok... Hurray!"
return 0
