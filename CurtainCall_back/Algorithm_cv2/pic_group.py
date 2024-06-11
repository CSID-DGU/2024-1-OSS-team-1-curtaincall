from .metadata_loader import get_metadata_time
from .keras_keywords import get_single_keyword
from .cv2_histogram import calculate_histogram, compare_histogram

class pic_group:

    def __init__(self):
        self.url = []
        self.keywords = []
        self.points = []
        self.start_time = None
        self.end_time = None
        self.histogram = dict()

    def create_new(self, photo, url):
        self.url.append(url)
        self.start_time = get_metadata_time(photo)
        self.end_time = self.start_time
        self.keywords = get_single_keyword(photo)
        self.histogram = calculate_histogram(photo)


    def checkin(self, photo, url):

        moho = 0

        data_t = get_metadata_time(photo)
        if data_t != None:
            if self.end_time + 3600 < data_t:
                return False
            elif self.start_time - 3600 > data_t:
                return False
            elif (self.end_time + 10 > data_t) and (self.start_time - 10 < data_t):
                moho += 1


        hist = calculate_histogram(photo)
        hist_point1 = compare_histogram(self.histogram, hist)
        hist_point2 = compare_histogram(hist, self.histogram)
        print("histpoints")
        print(hist_point1, hist_point2)
        hist_point = (hist_point1 + hist_point2) / 2
        if hist_point > 0.83:
            self.append(url, data_t)
            return True
        elif hist_point > 0.68:
            moho += 1

        keywords = get_single_keyword(photo)

        for keyword in keywords:
            for self_keyword in self.keywords:
                if keyword[0] == self_keyword[0]:
                    if abs(keyword[1] - self_keyword[1]) < 7:
                        self.append(url, data_t)
                        return True
                    elif abs(keyword[1] - self_keyword[1]) < 28:
                        moho += 1

        if moho >= 2:
            self.append(url, data_t)
            return True



    def append(self, url, data_t):
        if self.start_time == None:
            self.start_time = data_t
            self.end_time = data_t
        else:
            if self.start_time > data_t:
                self.start_time = data_t
            if self.end_time < data_t:
                self.end_time = data_t

        self.url.append(url)

