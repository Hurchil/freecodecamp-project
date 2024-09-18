import copy, random

class Hat:
    def __init__(self, **args) -> None:        
        self.contents = []
        for boule, count in args.items():
            self.contents.extend([boule for _ in range(count)])
        



    def draw(self, count):
        if count >= len(self.contents):
            copie = copy.copy(self.contents)
            self.contents = []
            return copie
        result = []
        
        while self.contents and count:
            index = random.randint(0, len(self.contents) - 1)
            value = self.contents[index]
            result.append(value)
            self.contents.remove(value)
            count -= 1
        
        return result   

def experiment(hat:Hat, expected_balls:dict, num_balls_drawn, num_experiments):
    num_win:int = 0

    for _ in range(num_experiments):
        result = copy.deepcopy(hat).draw(num_balls_drawn)
        result_ball = {}
        for ball in result:
            result_ball[ball] = result_ball[ball] + 1 if ball in result_ball else 1

        if all(result_ball.get(color, 0) >= count for color, count in expected_balls.items()):
            num_win += 1
        
    
    return num_win / num_experiments

hat = Hat(black=6, red=4, green=3)
probability = experiment(hat=hat,
                  expected_balls={'red':2,'green':1},
                  num_balls_drawn=5,
                  num_experiments=2000)

print(probability)

# h = Hat(black=6, red=4, green=3)
# print(h.contents)
# print(h.draw(14))