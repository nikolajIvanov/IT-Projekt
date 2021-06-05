from datetime import date, datetime

geb = "1994-12-18"
date_time_obj = datetime.strptime(geb, '%Y-%m-%d')
# print(date_time_obj.year)

today = date.today()
alter = today.year - date_time_obj.year - ((today.month, today.day) < (date_time_obj.month, date_time_obj.day))
print(alter)
