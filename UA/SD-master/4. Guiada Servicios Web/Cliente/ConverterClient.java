package ejemplo;

import java.rmi.RemoteException;

import org.apache.axis2.AxisFault;

public class ConverterClient {

        public static void main(String[] args) {
                try {
                        float celsiusValue = 100;
                        ConverterStub stub = new ConverterStub();
                        ejemplo.ConverterStub.CelsiusToFarenheit c2f = new ejemplo.ConverterStub.CelsiusToFarenheit();
                        c2f.setCelsius(celsiusValue);
                        ejemplo.ConverterStub.CelsiusToFarenheitResponse res = stub.celsiusToFarenheit(c2f);
                        System.out.println("Celsius : "+celsiusValue+" = "+"Farenheit : "+res.get_return());
                } catch (AxisFault e) {
                        e.printStackTrace();
                } catch (RemoteException e) {
                        e.printStackTrace();
                }

        }
}

