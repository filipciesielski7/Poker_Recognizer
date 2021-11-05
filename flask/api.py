from flask import Flask, render_template_string, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import cv2
from skimage import io, data, filters, color, measure, exposure, morphology, img_as_float32
import numpy as np
from matplotlib import pyplot as plt
import threading

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/image', methods=["GET"])
@cross_origin()
def get_images():
    return {'image': ["image1", "image2", "image3"]}


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    data = request.get_json(silent=True)
    image = {'filename': data.get('image')}
    filename = data.get('image')[17:]
    img1 = io.imread(f"../public/{filename}")
    img2 = color.rgb2gray(img1)
    threading.Thread(target=task, args=(img1,img2,)).start()
    print(img1)
    return image


def task(img1, img2):
    io.imsave("../public/examples/aktualny.jpeg", img1)
    io.imsave("../public/examples/test.jpeg", img2)
    return