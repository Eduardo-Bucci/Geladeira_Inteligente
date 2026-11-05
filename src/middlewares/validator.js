const { ZodError } = require('zod'); 

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    return next();
  } catch (error) {
    let issues = [];

    if (error.message && error.message.startsWith('[')) {
      try {
        issues = JSON.parse(error.message);
      } catch (e) {
        issues = [];
      }
    } else if (Array.isArray(error.errors)) {
      issues = error.errors;
    }

    if (issues.length > 0) {
      return res.status(400).json({
        status: 'Error',
        mensagem: 'Erro de validação dos campos',
        erros: issues.map((e) => ({
          campo: Array.isArray(e.path) ? e.path.join('.') : 'campo',
          mensagem: e.message,
        })),
      });
    }


    return res.status(500).json({
      status: 'Error',
      mensagem: error.message || 'Erro interno no servidor',
    });
  }
};

module.exports = { validate };