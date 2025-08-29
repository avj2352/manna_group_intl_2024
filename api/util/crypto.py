from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
# ..custom
from util.env_config import KEY_SIGNATURE

def _generate_key(password: str, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
    return key

def encrypt_message(message: str, key: bytes) -> str:
    f = Fernet(key)
    encrypted_message = f.encrypt(message.encode())
    encoded_bytes = base64.b64encode(encrypted_message)
    return encoded_bytes.decode('ascii')

def decrypt_message(encrypted_message: str, key: bytes) -> str:
    f = Fernet(key)
    in_bytes = base64.b64decode(encrypted_message)
    decrypted_message = f.decrypt(in_bytes).decode()
    return decrypted_message

# ENCRYPT
def _get_key() -> bytes:
    MANNA_SALT = b'manna2025_'
    return _generate_key(KEY_SIGNATURE, MANNA_SALT) 

# app encryption key
APP_KEY: bytes = _get_key()

def test_init():
    # Example usage
    password = "Abcd123"  # Your custom password
    salt = b'salt_'  # Use a unique salt for each key
    key = _generate_key(password, salt)

    # Example usage
    message = "I am python"
    encrypted = encrypt_message(message, key)
    decrypted = decrypt_message(encrypted, key)

    print(f"Original: {message}")
    print(f"Encrypted: {encrypted}")
    print(f"Decrypted: {decrypted}")

# TESTING
if __name__ == "__main__":
    test_init()

