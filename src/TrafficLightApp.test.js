import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TrafficLightApp from "./TrafficLightApp"; // ajuste o caminho se necessário

// Mock da biblioteca USB
jest.mock("react-native-usb-serial", () => ({
  listDevices: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn(),
  write: jest.fn(),
}));

import UsbSerial from "react-native-usb-serial";

describe("TrafficLightApp", () => {
  beforeEach(() => {
    // Resetar mocks antes de cada teste
    jest.clearAllMocks();
  });

  test("conecta ao dispositivo USB e envia comandos", async () => {
    // Mockando a lista de dispositivos
    UsbSerial.listDevices.mockResolvedValueOnce([
      { vendorId: 1, productId: 1 },
    ]);
    UsbSerial.connect.mockResolvedValueOnce();

    const { getByText } = render(<TrafficLightApp />);

    // Espera pela mensagem de conexão
    await waitFor(() => expect(UsbSerial.connect).toHaveBeenCalled());
    expect(getByText(/Conectado ao dispositivo/i)).toBeInTheDocument();

    // Testando o envio de comandos
    UsbSerial.write.mockResolvedValueOnce();

    fireEvent.click(getByText("Vermelho"));
    await waitFor(() => expect(UsbSerial.write).toHaveBeenCalledWith("R"));
    expect(getByText(/Comando R enviado/i)).toBeInTheDocument();

    fireEvent.click(getByText("Amarelo"));
    await waitFor(() => expect(UsbSerial.write).toHaveBeenCalledWith("Y"));
    expect(getByText(/Comando Y enviado/i)).toBeInTheDocument();

    fireEvent.click(getByText("Verde"));
    await waitFor(() => expect(UsbSerial.write).toHaveBeenCalledWith("G"));
    expect(getByText(/Comando G enviado/i)).toBeInTheDocument();
  });

  test("mostra alerta se nenhum dispositivo USB for encontrado", async () => {
    // Mockando a lista de dispositivos para retornar vazio
    UsbSerial.listDevices.mockResolvedValueOnce([]);

    const { getByText } = render(<TrafficLightApp />);

    // Espera pelo alerta
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Nenhum dispositivo USB encontrado",
      ),
    );
  });

  test("mostra alerta ao tentar enviar comando sem conexão", async () => {
    const { getByText } = render(<TrafficLightApp />);

    fireEvent.click(getByText("Vermelho"));
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Primeiro, conecte-se ao dispositivo",
      ),
    );
  });
});
