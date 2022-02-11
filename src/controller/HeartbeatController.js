function sendHealth(req, res) {
  const pid = process.pid;

  return res.status(200).json({ message: `server running with pid ${pid}` });
}

module.exports = { sendHealth };
