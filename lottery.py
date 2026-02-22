# lottery.py
import random
import time
from datetime import datetime

def get_date_prefix():
    """आज की तारीख YYYYMMDD format में देगा"""
    now = datetime.now()
    return now.strftime("%Y%m%d")

def generate_lottery_number():
    """1000 से 10000 तक का Random Number generate करेगा"""
    return random.randint(1000, 10000)

def check_time():
    """12:00 PM है या नहीं चेक करें"""
    now = datetime.now()
    current_hour = now.hour
    current_minute = now.minute
    current_second = now.second
    
    return current_hour == 12 and current_minute == 0 and current_second == 0

def main():
    print("=" * 60)
    print("        🎰 Lottery Number Generator 🎰")
    print("=" * 60)
    print(f"   Format: YYYYMMDD1000 to YYYYMMDD10000")
    print(f"   Start Time: 12:00 PM (दोपहर)")
    print("=" * 60)
    
    is_running = False
    last_minute = -1
    
    while True:
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        current_minute = now.minute
        
        # 12:00 PM पर शुरू करें
        if now.hour == 12 and now.minute == 0 and now.second == 0:
            is_running = True
            print(f"\n🎉 {current_time} - Lottery Generator Started!")
        
        # हर मिनट नया नंबर generate करें
        if is_running and current_minute != last_minute:
            date_prefix = get_date_prefix()
            lottery_num = generate_lottery_number()
            full_number = f"{date_prefix}{lottery_num}"
            
            print(f"\n🕐 Time: {current_time}")
            print(f"🎰 New Winning Number: {full_number}")
            print(f"   (Date: {date_prefix}, Number: {lottery_num})")
            
            last_minute = current_minute
        
        # Status दिखाएं
        if now.hour < 12:
            print(f"\r⏳ Waiting for 12:00 PM... Current: {current_time}", end="")
        else:
            if not is_running:
                is_running = True
                print(f"\n🎉 {current_time} - Lottery Generator Started!")
        
        time.sleep(1)

if __name__ == "__main__":
    main()
