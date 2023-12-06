import os
from flask import Flask, request, send_from_directory, render_template


app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
    return render_template('index.html')  # Ensure you have a 'templates' folder with 'index.html' in it.

@app.route('/get_images', methods=['GET'])
def get_images():
    factor = request.args.get('factor')
    block = request.args.get('block')
    images = []
    # Assuming your SVG files are stored in a directory named 'nmf_images'
    directory = os.path.join('nmf_images')
    for filename in os.listdir(directory):
        if f"factor{factor}" in filename and f"block_{block}" in filename:
            images.append(os.path.join(directory, filename))
    # You can modify this part to send back the images in the desired format
    return {'images': images}

@app.route('/nmf_images/<path:filename>')
def send_svg(filename):
    return send_from_directory('nmf_images', filename)

if __name__ == '__main__':
    app.run(debug=True)
