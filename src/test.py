from datetime import datetime, timedelta
time = datetime.now()
print(time)
print(time - timedelta(weeks=2))
"""time = datetime.now()
time_between_insertion = datetime.now() - (datetime.now() - (time.day-2))

if time_between_insertion.days > 30:
    print("The insertion date is older than 30 days")

else:
    print("The insertion date is not older than 30 days")
"""