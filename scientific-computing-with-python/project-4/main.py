class Rectangle:
    __slots__ = ('__width', '__height')
    def __init__(self, width, height) -> None:
        self.__width:int = width
        self.__height:int = height

    @property
    def width(self):
        return self.__width

    @property
    def height(self):
        return self.__height
    
    @height.setter
    def height(self, height):
        self.__height = height

    @width.setter
    def width(self, width):
        self.__width = width
        
    def set_width(self, width):
        self.width = width
    

    
    def set_height(self, height):
        self.height = height
    
    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * self.width + 2 * self.height

    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** .5
    
    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return 'Too big for picture.'
        start_list = [["*" for _ in range(self.width)] for _ in range(self.height)]

        final_string = ""
        for i in start_list:
            final_string += "".join(i) + "\n"
        return final_string
    
    def get_amount_inside(self, other):
        return (self.width // other.width) * (self.height // other.height) 

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(width={self.width}, height={self.height})"

class Square(Rectangle):
    def __init__(self, side) -> None:
        super().__init__(side, side)

    @property
    def side(self):
        return self.width
    
    def set_side(self, side):
        self.width = side
        self.height = side
    def set_height(self, side):
        self.width = side
        self.height = side
    def set_width(self, side):
        self.width = side
        self.height = side
        
    def __repr__(self):
        return f"{self.__class__.__name__}(side={self.side})"
    
if __name__ == '__main__':
    s =Square(51)
    r = Rectangle(15, 6)
    print(s)
    print(r)
