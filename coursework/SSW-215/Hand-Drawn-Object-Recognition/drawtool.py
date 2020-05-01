from tkinter import *
import random
import skimage.io as ski_io
import tensorflow as tf
from tensorflow import keras
import os
import numpy as np
import imageio
from PIL import Image

from skimage.transform import resize

# This function has the information necessary to create a model with the appropriate dimensions
def create_model():
    model = tf.keras.models.Sequential([
        keras.layers.Dense(512, activation=tf.keras.activations.relu, input_shape=(784,)),
        keras.layers.Dropout(0.2),
        keras.layers.Dense(16, activation=tf.keras.activations.softmax)
    ])

    model.compile(optimizer=tf.keras.optimizers.Adam(),
                loss=tf.keras.losses.sparse_categorical_crossentropy,
                metrics=['accuracy'])

    return model

def get_prediction():
    # item_list = ['drums', 'sun', 'laptop', 'book', 'traffic_light', 'wristwatch', 'wheel', 'shovel', 'cake', 'clock', 'broom', 'crown', 'cactus', 'car', 'bicycle', 'donut']
    # string_item = random.choice(item_list)
    # return string_item

    tf.__version__

    checkpoint_path = "training_1/cp.ckpt"
    checkpoint_dir = os.path.dirname(checkpoint_path)

    # Import the class names to translate the model output from an index to a meaninful class name
    class_names = ['pants', 'cloud', 'shovel', 'eyeglasses', 'drums', 'book', 'cactus', 'cake', 'donut', 'traffic_light', 'crown', 'sun', 't-shirt', 'broom', 'wristwatch', 'wheel']
    # To run the model we already trained, we must create a new model with the same parameters and load the trained weights
    res_model = create_model()
    res_model.load_weights(checkpoint_path) #load weights from folder

    img = Image.open('canvas_image.png')

        
    img = img.resize((112, 112), Image.ANTIALIAS)
    img = img.resize((28,28))
    img.save("image.png")

    img = Image.open("image.png")
    np_img = np.array(img)
    np_img = np_img[:,:,0]
    np_img = abs(np_img-255)/255

    image_vector = np_img.flatten()
    image_vector = image_vector.reshape(1,784)

    Y_idx = int(np.argmax(res_model.predict(image_vector)))
    # translate the index to a class name
    predicted_class = class_names[Y_idx]
    print(predicted_class)


    return predicted_class


class MainWindow:
    def close_all(self):
        #   Closes all windows          
        self.root.destroy()
        
    def enable_draw(self, event):
        #   Sets up the necessary variables to begin drawing on the canvas
        size = self.size
        x, y = event.x, event.y
        self.last_x, self.last_y = x, y
        self.brush_down = True
        self.actions.append(self.canvas.create_oval(x-(size/2), y-(size/2), x+(size/2), y+(size/2), outline = self.color, fill = self.color))

    def disable_draw(self, event):
        #   Disables canvas drawing
        self.brush_down = False

    def update(self, event):
        #   If you are not drawing, display the cursor, otherwise, draw a line from the last x,y to the new x,y
        size = self.size
        x, y = event.x, event.y
        try:
            self.canvas.delete(self.cursor)
        finally:
            if not self.brush_down:
                if self.color != "white":
                    self.cursor = self.canvas.create_oval(x-(size/2), y-(size/2), x+(size/2), y+(size/2), outline = self.color)
                else:
                    self.cursor = self.canvas.create_oval(x-(size/2), y-(size/2), x+(size/2), y+(size/2), outline = "black")
            else:
                self.actions.append(self.canvas.create_line(x, y, self.last_x, self.last_y, width=size, fill = self.color))
                self.actions.append(self.canvas.create_oval(x-(size/2), y-(size/2), x+(size/2), y+(size/2), outline = self.color, fill = self.color))
                self.last_x, self.last_y = x, y

    def remove_cursor(self, event):
        #   Remove the cursor
        self.canvas.delete(self.cursor)

    def clear_canvas(self, event):
        #   Clear all drawn objects on the canvas
        self.canvas.delete(ALL)

    def test_canvas(self, event):
        #   Saves to postscript file
        save_file = self.canvas.postscript(file = "image1.eps")
        # read the postscript data
        data = ski_io.imread("image1.eps")

        # write a rasterized png file
        ski_io.imsave("canvas_image.png", data)
        
        # self.saving = False

        #img = Image.open("image.ps")
        #img.save("image.png", "png")

        string_item = get_prediction()
        self.guess_label.config(text = "Is it a "+string_item+"?")

    def new_chosen(self, event):
        self.canvas.delete(ALL)
        item_list = ['pair of pants', 'cloud', 'shovel', 'eyeglasses', 'drum', 'book', 'cactus', 'cake', 'donut', 'traffic_light', 'crown', 'sun', 't-shirt', 'broom', 'wristwatch', 'wheel']
        string_item = random.choice(item_list)
        self.prompt_label.config(text = "Draw a "+string_item)        
           
    def __init__(self):
        #   Sets up the window
        self.root = Tk()
        self.color = "black"
        self.size = 10
        self.size_text = StringVar()
        self.size_text.set(self.size)
        self.brush_down = False
        self.palate = False
        self.saving = False
        self.actions = []
        self.cursor = 0
        self.last_x, self.last_y = 0, 0
        prompt_string = " "
        guess_string = " "

        self.clear_button = Button(self.root, highlightbackground = "red", bg = "red", text = "Clear")
        self.test_button = Button(self.root, highlightbackground = "green", bg = "green", text = "Test")
        self.prompt_label = Label(self.root, text = prompt_string)
        self.new_button = Button(self.root, highlightbackground = "blue", bg = "blue", text = "New")
        self.guess_label = Label(self.root, text = guess_string)
        self.yes_button = Button(self.root, highlightbackground = "green", bg = "green", text = "Yes")
        self.no_button = Button(self.root, highlightbackground = "red", bg = "red", text = "No")
        self.canvas = Canvas(self.root, bg = "white", height = 560, width = 560, cursor="none")

        self.clear_button.grid(row = 0, column = 0, sticky = W+E)
        self.test_button.grid(row = 0, column = 1, sticky = W+E)
        self.prompt_label.grid(row = 0, column = 2, sticky = W+E)
        self.new_button.grid(row = 0, column = 3, sticky = W+E)
        self.guess_label.grid(row = 0, column = 4, sticky = W+E)
        self.yes_button.grid(row = 0, column = 5, sticky = W+E)
        self.no_button.grid(row = 0, column = 6, sticky = W+E)
        self.canvas.grid(row = 2, column = 0, columnspan = 7, sticky = W+E)
        
        self.canvas.bind('<Motion>', self.update)
        self.canvas.bind('<ButtonPress-1>', self.enable_draw)
        self.canvas.bind('<ButtonRelease-1>', self.disable_draw)
        self.canvas.bind('<Leave>', self.remove_cursor)
        self.clear_button.bind('<Button-1>', self.clear_canvas)
        self.test_button.bind('<Button-1>', self.test_canvas)
        self.new_button.bind('<Button-1>', self.new_chosen)      #new, yes and no all call to the same function
        self.yes_button.bind('<Button-1>', self.new_chosen)
        self.no_button.bind('<Button-1>', self.new_chosen)

        self.root.protocol("WM_DELETE_WINDOW", self.close_all)
        self.root.mainloop()

app = MainWindow()
