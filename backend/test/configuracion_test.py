import pytest

from IRA import create_app, db

@pytest.fixture()
def client(app):
    return app.test_client()

@pytest.fixture
def app():
    app = create_app(test_config=True)
    yield app
    with app.app_context():
        db.drop_all()

@pytest.fixture
def mocker():
    from unittest.mock import Mock
    return Mock()
