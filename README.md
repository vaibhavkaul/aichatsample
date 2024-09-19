# aichatsample

Basic AI chat sample with FE / BE / Training code

# Install

## Frontend

The app is very basic and should be used with npm.

For Dev

```
npm start
```

For prod build

```
npm run build
```

## Training

you have to do this before you run the backend

- In your env set `OPENAI_API_KEY`
- put some documents, preferrable pdf files in training/input directory

Python 3.9 required. Use virtual envs.
Install pyenv first thing.
In your env set `OPENAI_API_KEY`

```
pyenv install 3.9
pyenv local 3.9

python3 -m venv .venv
source .venv/bin/activate
```

Note: the virtual env can be shared between taining / backend

```
pip install -r training/requirements.txt

python3 training/create_index.py
```

Runnign this will create the index files in backend/index

you are now ready to start your backend server

## Backend

Python 3.9 required. Use virtual envs.

Install pyenv first thing.

In your env set `OPENAI_API_KEY`

### Dev

```
pyenv install 3.9
pyenv local 3.9


python3 -m venv .venv
source .venv/bin/activate

pip install -r backend/requirements.txt

cd backend

uvicorn app:app --reload

```

### Prod

```
uvicorn app:app --host 0.0.0.0 --port 8000
```
