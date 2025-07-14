from passlib.hash import bcrypt

# Cambia esta variable con la contraseña que quieras encriptar
plain_password = "123456"

# Hashea la contraseña
hashed_password = bcrypt.hash(plain_password)

print("Contraseña hasheada:")
print(hashed_password)
