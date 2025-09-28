"""
    List of
    Application level defined exceptions
"""

# Custom Exception for DAO layer
class UserDAOException(Exception):
    def __init__(self, message="UserDAO Error! error calling users db"):
        self.message = message
        super().__init__(self.message)

class AssetDAOException(Exception):
    def __init__(self, message="AssetDAO Error! error executing assets table operations"):
        self.message = message
        super().__init__(self.message)


# Custom Exception for S3 issues
class S3Exception(Exception):
    def __init__(self, message="S3 Error! error accessing s3 bucket"):
        self.message = message
        super().__init__(self.message)

# Custom Exception for SQLite connection
class TursoSQLException(Exception):
    def __init__(self, message="DB Error! Turso SQLite connection failed"):
        self.message = message
        super().__init__(self.message)

# Custom Exception for DAO Layer
class TimerDAOException(Exception):
    def __init__(self, message="TimerDAO Error! error calling timers db"):
        self.message = message
        super().__init__(self.message)

# Custom exception for tags
class TagDAOException(Exception):
    def __init__(self, message="TagDAO Error! error calling tags db"):
        self.message = message
        super().__init__(self.message)
