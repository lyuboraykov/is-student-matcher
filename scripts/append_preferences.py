from __future__ import print_function

from random import shuffle

LINES_TO_MODIFY = 150

def get_appended_content(i):
    if i == 0:
        return 'preferences'
    if i > LINES_TO_MODIFY:
        return ''
    arr_without_i = [j for j in range(LINES_TO_MODIFY) if j != i - 1]
    shuffle(arr_without_i)
    return ','.join(str(el) for el in arr_without_i)

def main():
    new_csv = ''
    with open('data/students.csv', 'r') as csv_reader:
        csv_lines = csv_reader.readlines()
        new_content = '\n'.join(['{};"{}"'.format(
                                csv_lines[i].replace('\n', ''),
                                get_appended_content(i)) for i in range(len(csv_lines))])
    with open('data/students-preferences.csv', 'w+') as writer:
        writer.write(new_content)

if __name__ == '__main__':
    main()
