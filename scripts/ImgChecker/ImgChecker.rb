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
    size = FastImage(studentImage)
    if size[0] > studentsImgSize or size[1] > studentsImgSize
        return 1
        puts "Image size is bigger"
        abort(studentImage)
    end
end

# Checking images in mentors section
for mentorImage in mentorsImgFiles
    size = FastImage(mentorImage)
    if size[0] > mentorsImgSize or size[1] > mentorsImgSize
        return 1
        puts "Image size is bigger"
        abort(mentorImage)
    end
end

# Checking images in projects section
for projectImage in projectsImgFiles
    size = FastImage(projectImage)
    if size[0] > projectsImgSize or size[1] > projectsImgSize
        return 1
        puts "Image size is bigger"
        abort(projectImage)
    end
end

# Checking images in icons section
for iconImage in iconsImgFiles
    size = FastImage(iconImage)
    if size[0] > iconsImgSize or size[1] > iconsImgSize
        return 1
        puts "Image size is bigger"
        abort(iconImage)
    end
end

# Checking images in logos section
for logoImage in logosImgFiles
    size = FastImage(logoImage)
    if size[0] > logosImgWidth or size[1] > logosImgHeight
        return 1
        puts "Image size is bigger"
        abort(logoImage)
    end
end

# Checking images in icon section
for blogImage in blogsImgFiles
    size = FastImage(blogImage)
    if size[0] > blogsImgSize or size[1] > blogsImgSize
        return 1
        puts "Image size is bigger"
        abort(blogImage)
    end
end

# Since all these tests never exited the program we are lucky the tests won
puts "All images are ok... Hurray!"
return 0
