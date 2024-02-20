import os
import smtplib
from email.mime.text import MIMEText
from ...models.examen.examen_model import Examen


def configure_smtp_server():
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(os.environ.get("SERVICE_EMAIL"),
                 os.environ.get("SERVICE_EMAIL_PASSWORD"))
    return server


def close_smtp_connection(server):
    server.quit()


def create_email_message(destinatario, asunto, cuerpo):
    msg = MIMEText(cuerpo)
    msg['Subject'] = asunto
    msg['From'] = os.environ.get("SERVICE_EMAIL")
    msg['To'] = destinatario
    return msg


def enviar_correo(destinatario, asunto, cuerpo):
    server = configure_smtp_server()
    msg = create_email_message(destinatario, asunto, cuerpo)
    server.sendmail("tryhardskill98@gmail.com", destinatario, msg.as_string())
    close_smtp_connection(server)


def obtener_destinatarios_por_examen(examen_id):
    examen = Examen.query.get(examen_id)
    if not examen:
        return []
    print([evaluador.correo for evaluador in examen.evaluadores_relacion])
    return [evaluador.correo for evaluador in examen.evaluadores_relacion]
