
class EvaluadorNoEncontradoError(Exception):
    def __init__(self, message="Evaluador no encontrado"):
        self.message = message
        super().__init__(self.message)

class EvaluadorDuplicadoError(Exception):
    def __init__(self, message="Evaluador duplicado"):
        self.message = message
        super().__init__(self.message)

class CampoRequeridoError(Exception):
    def __init__(self, campo, message="Campo requerido faltante"):
        self.campo = campo
        self.message = f"{message}: {campo}"
        super().__init__(self.message)
        
class ErrorGenerico(Exception):
    def __init__(self, message="Error genérico en la aplicación"):
        self.message = message
        super().__init__(self.message)
        
