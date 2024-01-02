import copy
import pygame

visualize = True  # whether to visualize the grid or not


def ImportFile(fileName):
    file = open(fileName, "r").read()
    lines = file.split("\n")
    data = {}
    data['sums'] = []
    data['nodes'] = {}
    for i in range(len(lines)):
        for j in range(len(lines[i])):
            if i == 0 and lines[i][j] == ".":
                data['start'] = i, j
            if i == len(lines)-1 and lines[i][j] == ".":
                data['end'] = i, j
            if lines[i][j] == '\r':
                continue
            if lines[i][j] == "#":
                continue
            data['nodes'][i, j
                          ] = {'neighbours': [], 'visited': False}
            if j != 0 and lines[i][j-1] != "#":
                data['nodes'][i, j
                              ]['neighbours'].append([i, j-1])
            if j != len(lines[i])-1 and lines[i][j+1] and lines[i][j+1] != "#":
                data['nodes'][i, j
                              ]['neighbours'].append([i, j+1])
            if i != len(lines)-1 and lines[i+1][j] != "#":
                data['nodes'][i, j
                              ]['neighbours'].append([i+1, j])
            if i != 0 and lines[i-1][j] != "#":
                data['nodes'][i, j
                              ]['neighbours'].append([i-1, j])

    data['forks'] = {}
    data['lines'] = lines
    data['pte'] = None, None

    return data


def display_grid(data, init=True, y=None, x=None, screen=None, lines=None, start=None, end=None):
    # Define colors
    WHITE = (255, 255, 255)
    BLACK = (0, 0, 0)
    GREEN = (0, 255, 0)
    RED = (255, 0, 0)
    BLUE = (0, 0, 255)
    PURPLE = (255, 0, 255)

    cell_size = 8
    if init:
        clock = pygame.time.Clock()
        screen.fill(WHITE)
        for i in range(len(lines)):
            for j in range(len(lines[i])):
                cell_value = lines[i][j]
                color = WHITE if cell_value == "." else BLACK
                if cell_value == "." and data[i, j]['visited']:
                    color = BLUE

                rect = pygame.Rect(j * cell_size, i *
                                   cell_size, cell_size, cell_size)
                if (cell_value == ">" or cell_value == "v"):
                    if (data[i, j]['visited']):
                        color = BLUE
                    else:
                        color = PURPLE
                    if cell_value == ">":

                        pygame.draw.polygon(screen, color, [
                                            (j * cell_size, i * cell_size), (j * cell_size + cell_size, i * cell_size + cell_size / 2), (j * cell_size, i * cell_size + cell_size)])
                    else:
                        pygame.draw.polygon(screen, color, [
                                            (j * cell_size, i * cell_size), (j * cell_size + cell_size / 2, i * cell_size + cell_size), (j * cell_size + cell_size, i * cell_size)])
                else:
                    pygame.draw.rect(screen, color, rect)

        start_rect = pygame.Rect(
            start[1] * cell_size, start[0] * cell_size, cell_size, cell_size)
        end_rect = pygame.Rect(
            end[1] * cell_size, end[0] * cell_size, cell_size, cell_size)

        pygame.draw.rect(screen, GREEN, start_rect)
        pygame.draw.rect(screen, RED, end_rect)

        pygame.display.flip()
        clock.tick(60)
    else:
        # update one cell
        rect = pygame.Rect(x * cell_size, y * cell_size, cell_size, cell_size)
        pygame.draw.rect(screen, BLUE, rect)
        pygame.display.flip()


def Part1(data, screen=None):
    Walk(data['nodes'], data['start'], 0, True, data, screen)
    return max(data['sums'])


def Part2(data, screen=None):
    return 'TODO: Part 2; function used in P1 takes way too long to run'


def Walk(data, start, _sum, p1=True, d=None, screen=None):
    d_copy = copy.deepcopy(data)
    node = d_copy[start]
    curr_coord = start
    node['visited'] = True
    if visualize:
        display_grid(d_copy, True, y=None, x=None, screen=screen,
                     lines=d['lines'], start=d['start'], end=d['end'])
    if curr_coord == d['end']:
        d['pte'] = start
        d['sums'].append(_sum)
        d['sums'].sort(reverse=True)
        print(f"{d['sums'][:5]}  ({len(d['sums'])})")
        return

    n = copy.deepcopy(node['neighbours'])
    for i in range(len(node['neighbours'])):
        if d_copy[node['neighbours'][i][0], node['neighbours'][i][1]]['visited']:
            n.remove(node['neighbours'][i])
            continue
        if p1 and d['lines'][node['neighbours'][i][0]][node['neighbours'][i][1]] == '>' and node['neighbours'][i][1] < curr_coord[1]:
            n.remove(node['neighbours'][i])
            continue
        if p1 and d['lines'][node['neighbours'][i][0]][node['neighbours'][i][1]] == 'v' and node['neighbours'][i][0] < curr_coord[0]:
            n.remove(node['neighbours'][i])
            continue

    node['neighbours'] = n
    while len(node['neighbours']) == 1:
        if visualize:
            display_grid(data, False, curr_coord[0], curr_coord[1],
                         screen, d['lines'], d['start'], d['end'])
        _sum += 1
        curr_coord = node['neighbours'][0][0], node['neighbours'][0][1]
        temp = d_copy[curr_coord]
        n = copy.deepcopy(temp['neighbours'])
        for i in range(len(temp['neighbours'])):
            if d_copy[temp['neighbours'][i][0], temp['neighbours'][i][1]]['visited']:
                n.remove(temp['neighbours'][i])
                continue
            if p1 and d['lines'][temp['neighbours'][i][0]][temp['neighbours'][i][1]] == '>' and temp['neighbours'][i][1] < curr_coord[1]:
                n.remove(temp['neighbours'][i])
                continue
            if p1 and d['lines'][temp['neighbours'][i][0]][temp['neighbours'][i][1]] == 'v' and temp['neighbours'][i][0] < curr_coord[0]:
                n.remove(temp['neighbours'][i])
                continue

        temp['neighbours'] = n
        temp['visited'] = True
        node = temp

    if curr_coord == d['end']:
        d['pte'] = start
        d['sums'].append(_sum)
        d['sums'].sort(reverse=True)
        print(f"{d['sums'][:5]}  ({len(d['sums'])})")
        return

    if [d['pte'][0], d['pte'][1]] in node['neighbours']:
        Walk(d_copy, (d['pte'][0], d['pte'][1]), _sum + 1, p1, d, screen)
    else:
        for i in range(len(node['neighbours'])):
            Walk(d_copy, (node['neighbours'][i][0],
                          node['neighbours'][i][1]), _sum + 1, p1, d, screen)


def main():
    data = ImportFile("text.txt")
    pygame.init()

    # visualization
    if visualize:
        cell_size = 8
        width = len(data['lines'][0]) * cell_size
        height = len(data['lines']) * cell_size
        pygame.display.set_caption("Grid Display")
        screen = pygame.display.set_mode(
            (width, height), pygame.RESIZABLE)
    else:
        screen = None
    print(Part1(data, screen))
    print(Part2(data, screen))


if __name__ == "__main__":
    main()
