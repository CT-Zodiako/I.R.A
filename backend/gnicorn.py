# gunicorn_config.py

import multiprocessing

bind = "0.0.0.0:8000"  # Dirección y puerto en los que Gunicorn debe escuchar
# Número de procesos de trabajadores para Gunicorn
workers = multiprocessing.cpu_count() * 2 + 1
