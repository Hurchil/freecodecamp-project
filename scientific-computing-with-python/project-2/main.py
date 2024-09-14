WEEK_DAYS = {
    'monday': 'tuesday',
    'tuesday': 'wednesday',
    'wednesday': 'thursday',
    'thursday': 'friday',
    'friday': 'saturday',
    'saturday': 'sunday',
    'sunday': 'monday',
    "": ""
}

def add_time(start: str, duration: str, week_day: str="") -> str:
    # Parse start time and duration
    start_time, am_pm = start.split(' ')
    start_hours, start_minutes = map(int, start_time.split(':'))
    duration_hours, duration_minutes = map(int, duration.split(':'))

    # Convert start time to 24-hour format
    if am_pm == 'PM' and start_hours != 12:
        start_hours += 12
    elif am_pm == 'AM' and start_hours == 12:
        start_hours = 0

    # Convert duration to total minutes
    total_minutes = start_hours * 60 + start_minutes + duration_hours * 60 + duration_minutes

    # Calculate new time
    end_hours = (total_minutes // 60) % 24
    end_minutes = total_minutes % 60
    days_later = total_minutes // 1440  # Number of full days later

    # Determine the day of the week
    week_day = week_day.lower()
    for _ in range(days_later):
        week_day = WEEK_DAYS[week_day]

    # Convert 24-hour format to 12-hour format
    if end_hours == 0:
        end_hours = 12
        am_pm = 'AM'
    elif end_hours < 12:
        am_pm = 'AM'
    elif end_hours == 12:
        am_pm = 'PM'
    else:
        end_hours -= 12
        am_pm = 'PM'

    # Format the output
    day_suffix = ""
    if days_later == 1:
        day_suffix = " (next day)"
    elif days_later > 1:
        day_suffix = f" ({days_later} days later)"
    
    if week_day:
        week_day = ", " + week_day
    return f"Returns: {end_hours}:{end_minutes:02d} {am_pm}{week_day.title()}{day_suffix}"

# Test the function
if __name__ == '__main__':
    a = add_time('3:30 PM', '2:12')
    print(a)
