FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY pyproject.toml README.md ./
COPY src ./src
RUN pip install --no-cache-dir -e .
ENV COORDINATOR_URL=wss://coordinator.metademic.org/ws
CMD ["racn-node", "start"]
