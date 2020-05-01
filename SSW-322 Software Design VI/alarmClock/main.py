import sys
from tkinter import *
import datetime

def tick():
    current = datetime.datetime.now()
    timeString = current.strftime("%H:%M:%S")
    if timeString == alarm.cget("text")[7:]:
        print("BUZZ BUZZ BUZZ")
    clock.config(text=timeString)
    clock.after(200, tick)

def setAlarm():
    alarmTime = input("Enter Alarm (%H:%M:%S): ")
    alarm.config(text="Alarm: "+alarmTime)
    print("Alarm set to", alarmTime)

def snooze():
    snoozeTime = datetime.datetime.now() + datetime.timedelta(0, 540)
    alarmTime = snoozeTime.strftime("%H:%M:%S")
    alarm.config(text="Alarm: "+alarmTime)
    print("Alarm set to", alarmTime)

def setRadio():
    radioStation = input("Enter radio: ")
    radio.config(text="Radio: "+radioStation)
    print("Radio set to", radioStation)

def setVolume():
    volumeLevel = input("Enter Volume: ")
    volume.config(text="Volume: "+volumeLevel)
    print("Volume set to", volumeLevel)

def radioOn():
    radio.config(text="Radio: 1060AM")
    print("Radio On")

def radioOff():
    radio.config(text="Radio: Off")
    print("Radio Off")

if __name__ == "__main__":
    root = Tk()
    frame = Frame(root)
    frame.pack()
    radio = Label(frame, text="Radio: 1060AM", font=("arial", 24, "bold"), bg="white")
    radio.grid(row=0, column=1, columnspan=2)
    alarm = Label(frame, text="Alarm: None", font=("arial", 24, "bold"), bg="white")
    alarm.grid(row=0, column=3, columnspan=3)
    volume = Label(frame, text="Volume: 10", font=("arial", 24, "bold"), bg="white")
    volume.grid(row=0, column=6, columnspan=2)
    clock = Label(frame, font=("arial", 150, "bold"), bg="white")
    clock.grid(row=1, column=1, columnspan=7)
    quitButton = Button(frame,
                    text="Quit",
                    fg="red",
                    bg="blue",
                    command=quit,
                    highlightbackground='#3E4149')
    quitButton.grid(row=2, column=1)
    setAlarmButton = Button(frame,
                    text="Set Alarm",
                    command=setAlarm,
                    highlightbackground='#3E4149')
    setAlarmButton.grid(row=2, column=2)
    snoozeButton = Button(frame,
                    text="Snooze",
                    command=snooze,
                    highlightbackground='#3E4149')
    snoozeButton.grid(row=2, column=3)
    setRadioButton = Button(frame,
                    text="Set Radio",
                    command=setRadio,
                    highlightbackground='#3E4149')
    setRadioButton.grid(row=2, column=4)
    setVolumeButton = Button(frame,
                    text="Set Volume",
                    command=setVolume,
                    highlightbackground='#3E4149')
    setVolumeButton.grid(row=2, column=5)
    radioOnButton = Button(frame,
                    text="Radio On",
                    command=radioOn,
                    highlightbackground='#3E4149')
    radioOnButton.grid(row=2, column=6)
    radioOffButton = Button(frame,
                    text="Radio Off",
                    command=radioOff,
                    highlightbackground='#3E4149')
    radioOffButton.grid(row=2, column=7)
    tick()
    root.mainloop()
