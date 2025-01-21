from flask import Flask, request, jsonify
from transformers import BertForQuestionAnswering, BertTokenizer

app = Flask(__name__)

model_name = "bert-large-uncased-whole-word-masking-finetuned-squad"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForQuestionAnswering.from_pretrained(model_name)

context = (
    "FlickFinder is a web application for discovering movies and TV shows. "
    "You can search for ratings using our intuitive search bar, which allows you to input your preferences or mood. "
    "The navbar includes two buttons: one to toggle the sidebar on the left and another on the right side where you "
    "can view your profile if you decide to create an account."

    "By creating an account, you will have the ability to save your favorite series and movies, as well as save your chats with the chatbot. "
    "To access the chatbot in the left sidebar, simply click the button to toggle the chat bar. "
    "The application provides a list of relevant movies and TV shows based on your search. "
    "Filters include release year, movie duration, and rating, allowing you to refine your search results."

    "The Add to Watchlist button lets you save your favorite movies for easy access later. FlickFinder helps you organize and find movies and TV shows of interest effortlessly."
)

def get_answer(question, context):
    inputs = tokenizer.encode_plus(
        question,
        context,
        add_special_tokens=True,
        return_tensors="pt"
    )
    input_ids = inputs["input_ids"].tolist()[0]
    outputs = model(**inputs)
    start_scores = outputs.start_logits
    end_scores = outputs.end_logits

    start_index = start_scores.argmax()
    end_index = end_scores.argmax()

    answer = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(input_ids[start_index:end_index + 1])
    )
    confidence = float(start_scores.max().item())
    return answer, confidence

@app.route('/answer', methods=['POST'])
def answer_questions():
    try:
        data = request.get_json()
        questions = data.get("questions", [])

        if not questions:
            return jsonify({"error": "No questions provided."}), 400

        answers = []
        for question in questions:
            answer, confidence = get_answer(question, context)
            answers.append({
                "question": question,
                "answer": answer,
                "confidence": confidence
            })

        return jsonify({"answers": answers}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

