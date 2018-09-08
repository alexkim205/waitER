import myfitnesspal

client = myfitnesspal.Client('my_username')

day = client.get_date(2013, 3, 2)
day