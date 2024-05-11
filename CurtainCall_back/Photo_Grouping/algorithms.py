import asyncio
import time
import tkinter as tk
from tkinter import messagebox
from threading import Thread

# async def sleep(times,stageid):
#     # await asyncio.sleep(time)
#     time.sleep(int(times))
#     # Create a Tkinter window
#     root = tk.Tk()
#     root.withdraw()  # Hide the main window
#
#     # Display an alert dialog
#     messagebox.showinfo("Alert", "This is a Python-generated alert!")
#
#     # Run the Tkinter event loop
#     root.mainloop()
#     return True

def sleep2(times,stageid):
    time.sleep(int(times))
    # Create a Tkinter window
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    # Display an alert dialog
    messagebox.showinfo("Alert", "This is a Python-generated alert!")

    # Run the Tkinter event loop
    root.mainloop()
    return True

# Thread(target=sleep2, args=(5,1)).start()

