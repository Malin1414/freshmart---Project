function errorHandler(err, req, res, next) {
  // Centralized logging for security audits
  console.error(`[Security Audit] Error: ${err.message} | Path: ${req.path} | IP: ${req.ip}`);

  const status = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred.' 
    : err.message;

  res.status(status).json({
    ok: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;