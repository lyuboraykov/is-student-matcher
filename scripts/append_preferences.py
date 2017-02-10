from __future__ import print_function

from random import shuffle

LINES_TO_MODIFY = 150

CLOSE_FRIENDS = [
    [0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15], [16, 17], [19, 20],
    [21, 22], [23, 24], [25, 26], [27, 28], [30, 31], [32, 33],
    [34, 35], [36, 37], [38, 39], [41, 42], [43, 45], [46, 47], [48, 49], [50, 51],
    [52, 53], [54, 55], [56, 57], [58, 59], [60, 61], [62, 63], [64, 65], [66, 67],
    [68, 69], [70, 71], [72, 73], [75, 76], [77, 78], [79, 80], [81, 82],
    [83, 84], [85, 86], [87, 88], [90, 91], [92, 93], [94, 95], [96, 97],
    [98, 99], [101, 102], [104, 105], [106, 107], [108, 109],
    [110, 111], [112, 113], [114, 115], [116, 117], [119, 120], [121, 122],
    [124, 125], [126, 127], [128, 129], [130, 131], [134, 135], [136, 137], [138, 139],
    [140, 141], [142, 143], [144, 145], [146, 147], [148, 149], [150, 151], [152, 153],
    [154, 155], [156, 157], [158, 159], [160, 161], [162, 163], [164, 166], [167, 168],
    [169, 170], [171, 172], [173, 174], [175, 176], [177, 178], [179, 180], [181, 182],
    [184, 186], [187, 188], [189, 190], [191, 193], [194, 195], [196, 197], [199, 200], [201, 202],
    [204, 206], [207, 208], [209, 212], [215, 218], [219, 220], [221, 222], [223, 224], [226, 227],
    [229, 231], [233, 235], [236, 238], [239, 241], [242, 243], [244, 245], [246, 248], [249, 250],
    [251, 252], [253, 254], [255, 256], [258, 259], [261, 262], [263, 264], [266, 267], [269, 271],
    [272, 273], [274, 275], [279, 282], [283, 284], [285, 286], [287, 288], [289, 291], [293, 294], [295, 296], [298, 299],
    [301, 302], [303, 305], [306, 308], [310, 312], [316, 318], [319, 321], [322, 323], [324, 325], [326, 327],
    [328, 329], [330, 331], [332, 333], [334, 337], [338, 339], [340, 341], [343, 344], [345, 346], [347, 348],
    [351, 352], [353, 354], [355, 356], [357, 358], [359, 360], [361, 362], [363, 364], [365, 366], [367, 368],
    [370, 371], [372, 374], [375, 377], [378, 380], [381, 382], [383, 385], [386, 387], [388, 389], [391, 393], [394, 183],
    [18, 29], [89, 123], [203, 213], [225, 234], [270, 281], [335, 379], [390, 103],
    [315, 307], [276, 100], [133, 211], [228, 232], [240, 265], [278, 300], [314, 336], [349, 384],
    [40, 198], [74, 216], [247, 277], [304, 313], [320, 44], [132, 165], [185, 192],
    [210, 214], [217, 230], [257, 268], [290, 292], [297, 317], [342, 350], [369, 373], [376, 392],
    [280, 237], [309, 118], [260, 311], [205]
]


def get_appended_content(i):
    if i == 0:
        return 'close_friends'
    student_i = i - 1
    student_group = filter(lambda x: student_i in x, CLOSE_FRIENDS)
    friend = -1
    if len(student_group) > 0:
        for el in student_group[0]:
            if el != student_i:
                friend = el
    return friend


def main():
    new_csv = ''
    with open('data/students-preferences.csv', 'r') as csv_reader:
        csv_lines = csv_reader.readlines()
        new_content = '\n'.join(['{};"{}"'.format(
                                csv_lines[i].replace('\n', ''),
                                get_appended_content(i)) for i in range(len(csv_lines))])
    with open('data/students-preferences-friends.csv', 'w+') as writer:
        writer.write(new_content)

if __name__ == '__main__':
    main()
