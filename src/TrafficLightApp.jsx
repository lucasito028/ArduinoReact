import React, { useEffect, useState } from "react";

export default function TrafficLightApp() {
  const [connected, setConnected] = useState(false);

  // Simulando a listagem de dispositivos (como não podemos conectar via USB no navegador)
  const listDevices = () => {
    return Promise.resolve([
      { vendorId: 1, productId: 1 } // Simulação de dispositivo
    ]);
  };

  const connectDevice = (vendorId, productId) => {
    // Simulação da conexão
    return Promise.resolve();
  };

  const disconnectDevice = () => {
    // Simulação da desconexão
    return Promise.resolve();
  };

  // Simulando a escrita de um comando
  const writeCommand = (command) => {
    // Simulação do envio de comando
    return Promise.resolve();
  };

  useEffect(() => {
    // Inicializar e buscar dispositivos conectados
    listDevices()
      .then((devices) => {
        if (devices.length > 0) {
          // Conectar ao primeiro dispositivo encontrado
          return connectDevice(devices[0].vendorId, devices[0].productId);
        } else {
          alert("Nenhum dispositivo USB encontrado");
        }
      })
      .then(() => {
        setConnected(true);
        alert("Conectado ao dispositivo");
      })
      .catch((error) => {
        console.error("Erro ao conectar:", error);
      });

    return () => {
      if (connected) {
        disconnectDevice(); // Desconectar ao sair
      }
    };
  }, [connected]);

  // Enviar comando via USB Serial (simulação)
  const sendCommand = (command) => {
    if (connected) {
      writeCommand(command)
        .then(() => alert(`Comando ${command} enviado`))
        .catch((error) => console.error("Erro ao enviar comando:", error));
    } else {
      alert("Primeiro, conecte-se ao dispositivo");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Controle de Semáforo via USB</h1>
      <div style={styles.buttons}>
        <button onClick={() => sendCommand("R")}>Vermelho</button>
        <button onClick={() => sendCommand("Y")}>Amarelo</button>
        <button onClick={() => sendCommand("G")}>Verde</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '100vh',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
};
