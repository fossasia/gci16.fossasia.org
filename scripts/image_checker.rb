# Checks image constraints and fails the travis build if they are not
class ImageChecker
  def initialize(max_size, directories)
    puts 'Starting Image Checker, authored by Abishek V Ashok for FOSSASIA with love'
    puts "Improvements by Robby O'Connor during GCI 2016"
    @max_size = max_size
    @directories = directories
    ok?
  end

  # DRY things up a bit
  def check_image_dimensions?(image, size)
    require 'fastimage'
    image_size = FastImage.size(image)
    if image_size[0] > size || image_size[1] > size
      puts "The image #{image} is larger than #{size}px x #{size}px [w x h]"
      return false
    end
    true
  end

  def check_images?
    valid_sizes = true
    @directories.each do |dir|
      dir.each do |image|
        valid_sizes = false if check_image_dimensions?(image, @max_size)
      end
    end
    valid_sizes
  end

  def ok?
    if check_images?
      puts 'All images are ok... Hurray!'
    else
      puts 'Image Checker: There are images which exceed the expected dimensions as specified above'
      puts "Please resize your images so that are #{@max_size} x #{@max_size} [w x h]"
    end
  end
end

directories = [Dir['./img/students/**/*.*'], Dir['./img/students/**/*.*'],
               Dir['./img/mentors/**/*.*'], Dir['./img/blogs/**/*.*'],
               Dir['./img/privly/**/*.*']]

# Check images now.
ImageChecker.new 240, directories
