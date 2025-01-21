# Rezumat al librăriilor folosite

## **Zod**

- Oferă validare și tipare stricte pentru formulare.
- Verifică lungimea, tipul datelor (ex. stringuri, imagini `.jpg`) și alte constrângeri pentru siguranță.
- Previne trimiterea datelor incorecte către server.

## **useForm (react-hook-form)**

- Simplifică gestionarea formularelor.
- Elimină comportamentele implicite ale browserului (ex. `e.preventDefault`).
- Oferă o manieră optimizată de manipulare a datelor din formulare.

## **zodResolver**

- Integrează Zod cu `useForm`.
- Permite utilizarea validărilor definite în Zod direct în formulare.
- Asigură corectitudinea tipurilor pentru fiecare input.

## **lucide-react**

- Bibliotecă de iconițe SVG.
- Iconițele se redimensionează fără a deveni pixelate.
- Oferă o calitate vizuală superioară pentru orice dimensiune.

## **next-themes**

- Simplifică implementarea modului dark/light.
- Se integrează eficient cu Tailwind CSS pentru personalizarea temelor.

## **clsx și twMerge**

- Utilitare pentru combinarea claselor CSS din Tailwind.
- Permite suprascrierea elegantă a stilurilor predefinite, funcționalitate care lipsește implicit în Tailwind.

## **Axios**

- Bibliotecă pentru efectuarea cererilor HTTP.
- Oferă o sintaxă mai curată și funcții avansate comparativ cu `fetch`.

## **Next.js**

- Framework superior față de React.
- Oferă viteze mai mari de încărcare a paginilor prin rendering server-side.
- Permite utilizatorilor să vadă conținutul înainte ca toate scripturile să fie încărcate.

## **Clerk**

- Platformă pentru autentificare și gestionarea datelor utilizatorilor.
- Reduce riscurile legate de securitate la introducerea datelor personale.

## **Prisma**

- Bibliotecă pentru gestionarea bazelor de date.
- Elimină necesitatea scrierii SQL manual.
- Oferă suport pentru tipuri și scalabilitate, simplificând dezvoltarea backend-ului.

---

## **Flask**

- Folosit pentru implementarea unui endpoint cu BERT.
- BERT este un chatbot bazat pe inteligență artificială care răspunde la mesaje.
- Flask este preferat în Python, deoarece funcționalitatea de antrenare a BERT nu este complet suportată în JavaScript.

## **Transformers**

- **Descriere**: Biblioteca Transformers de la Hugging Face este esențială pentru procesarea limbajului natural (NLP).
- **Funcționalități**:
  - Oferă acces la o gamă largă de modele pre-antrenate, inclusiv BERT, pentru diverse sarcini NLP precum răspunsul la întrebări, traducerea automată și generarea de text.
  - Include instrumente pentru tokenizarea textului, transformând textul brut în formate pe care modelele le pot procesa.
  - Permite încărcarea și utilizarea ușoară a modelelor pentru inferență, facilitând integrarea acestora în aplicații web și alte servicii.

## **PyTorch**

- **Descriere**: PyTorch este o bibliotecă de învățare automată utilizată pentru dezvoltarea și antrenarea modelelor de învățare profundă.
- **Funcționalități**:
  - Oferă un set robust de instrumente pentru calcul tensorial, similar cu NumPy, dar cu suport pentru accelerare GPU.
  - Suportă construirea de rețele neuronale complexe printr-o interfață flexibilă și intuitivă.
  - Este backend-ul implicit pentru biblioteca Transformers, gestionând operațiile de calcul necesare pentru inferența modelelor NLP.
  - Beneficiază de o comunitate vastă și resurse educaționale, facilitând dezvoltarea rapidă și eficientă a modelelor de învățare profundă.

### **Tokenizers**

- **Descriere**: Parte a bibliotecii Transformers, oferă instrumente eficiente pentru procesarea și tokenizarea textului.
- **Funcționalități**:
  - Transformă textul brut în secvențe de tokeni pe care modelele de NLP le pot procesa.
  - Optimizează performanța și eficiența în preprocesarea datelor textuale.

### **JSON**

- **Descriere**: Modulul standard `json` din Python este utilizat pentru manipularea datelor în format JSON.
- **Funcționalități**:
  - Permite serializarea și deserializarea datelor între formatele Python și JSON.
  - Este esențial pentru gestionarea cererilor și răspunsurilor HTTP în aplicația Flask.
