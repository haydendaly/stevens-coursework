# Hand-Drawn-Object-Recognition
A Python application that provides a drawing interface that prompts users to draw an object and the program will identify it using computer vision.
Network was trained on Tensorflow using a Google Colab notebook (SSW215_Project_V2.ipynb). The notebook outputs the training data's weights as checkpoints.
The checkpoints are located in the training-1 folder. The <strong> drawtool.py </strong> is the main file. It contains the canvas, and it uses the training checkpoints to predict from the image coming from the canvas.


