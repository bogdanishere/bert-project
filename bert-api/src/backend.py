from flask import Flask, request, jsonify
import torch
from transformers import BertForQuestionAnswering, BertTokenizerFast
from scipy.special import softmax
import numpy as np

model_name = "deepset/bert-base-cased-squad2"
tokenizer = BertTokenizerFast.from_pretrained(model_name)
model = BertForQuestionAnswering.from_pretrained(model_name)

app = Flask(__name__)

with open('context.txt', 'r') as file:
    context = file.read()

def predict_answer(context, question):
    inputs = tokenizer(question,
                        context,
                        return_tensors="pt",
                        max_length=512,
                        truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    start_scores, end_scores = softmax(outputs.start_logits)[0], softmax(outputs.end_logits)[0]

    start_idx = np.argmax(start_scores)
    end_idx = np.argmax(end_scores)

    confidence_score = float((start_scores[start_idx] + end_scores[end_idx]) / 2)

    answer_ids = inputs.input_ids[0][start_idx: end_idx + 1]
    answer_tokens = tokenizer.convert_ids_to_tokens(answer_ids)
    answer = tokenizer.convert_tokens_to_string(answer_tokens)

    if answer != tokenizer.cls_token:
        return answer, confidence_score
    return None, confidence_score

@app.route('/')
def home():
    return "Hello, World!"
    

@app.route('/answer', methods=['POST'])
def answer():
    data = request.json
    questions = data.get('questions', [])

    print("questions", questions)

    if not questions:
        return jsonify({"error": "'questions' is required"}), 400

    answers = []
    for question in questions:
        answer, score = predict_answer(context, question)
        answers.append({
            "question": question,
            "answer": answer if answer else "No answer found",
            "confidence": score
        })

    return jsonify({"answers": answers})


@app.route('/chunked-answer', methods=['POST'])
def chunked_answer():
    data = request.json
    questions = data.get('questions', [])
    chunk_size = data.get('chunk_size', 3)
    stride = data.get('stride', 1)

    if not questions:
        return jsonify({"error": "'questions' is required"}), 400

    sentences = context.split("\n")
    chunks = []
    num_sentences = len(sentences)
    for i in range(0, num_sentences, chunk_size - stride):
        chunk = sentences[i: i + chunk_size]
        chunks.append("\n".join(chunk))

    answers = {}
    for chunk in chunks:
        for question in questions:
            answer, score = predict_answer(chunk, question)
            if answer:
                if question not in answers or score > answers[question]["confidence"]:
                    answers[question] = {"answer": answer, "confidence": score}

    return jsonify(answers)

if __name__ == '__main__':
    app.run(debug=True)
