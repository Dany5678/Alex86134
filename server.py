# server.py

from flask import Flask, render_template, request, jsonify
import json
import os
import hashlib

app = Flask(__name__)
data_file = "data.json"

def load_data(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)
    else:
        return []

@app.route('/save', methods=['POST'])
def save_data():
    data = request.get_json()  # Ottieni i dati inviati dal client
    try:
        with open('data.json', 'a') as file:  # Apre il file JSON in modalità append
            file.write(json.dumps(data) + '\n')  # Scrive i dati nel file JSON
        return jsonify({'success': True}), 200  # Restituisci una risposta di successo
    except Exception as e:
        print(e)
        return jsonify({'success': False}), 500  # Restituisci una risposta di errore               # Aggiungi una nuova riga

@app.route('/save', methods=['POST'])
def save_form_data():
    form_data = request.json  # Assume che i dati siano inviati come JSON
    if form_data:
        # Crea un dizionario con i dati ricevuti
        record = {
            "name": form_data.get("name"),
            "surname": form_data.get("surname"),
            "birthplace": form_data.get("birthplace")
        }
        save_data(record, data_file)  # Salva il record nel file JSON
        return jsonify({"message": "Dati salvati correttamente"}), 200
    else:
        return jsonify({"error": "Nessun dato ricevuto"}), 400

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getData', methods=['POST'])
def get_data():
    data = request.json
    password = data['password']
    all_data = load_data(data_file)
    if password in all_data:
        return jsonify(exists=True, name=all_data[password]['name'], surname=all_data[password]['surname'], birthplace=all_data[password]['birthplace'])
    return jsonify(exists=False)

@app.route('/protected_cd34.html')
def protected_cd34():
    return render_template('protected_cd34.html')

@app.route('/protected_cd88.html')
def protected_cd88():
    return render_template('protected_cd88.html')

@app.route('/<string:page_name>')
def render_page(page_name):
    return render_template(page_name)

if __name__ == '__main__':
    app.run(debug=True)
