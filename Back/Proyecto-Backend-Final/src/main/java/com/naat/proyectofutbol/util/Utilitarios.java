package com.naat.proyectofutbol.util;

public class Utilitarios {


    public boolean esTelefonoValido(String telefono) {
        return telefono != null && telefono.matches("\\d{9}");
    }

    public static String incrementarSecuencia(String secuencia) {
        if (secuencia == null) {
            secuencia = "0000";  
        }
        System.out.print(secuencia);
        String alphaPart = secuencia.substring(0, secuencia.length() - 2);
        String numericPart = secuencia.substring(secuencia.length() - 2);
        try {
            int num = Integer.parseInt(numericPart);
            num++;
            if (num > 99) {
                alphaPart = incrementarPrefijo(alphaPart);
                num = 0;
            }
            return alphaPart + String.format("%02d", num);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String incrementarPrefijo(String prefix) {
        char[] chars = prefix.toCharArray();
        for (int i = chars.length - 1; i >= 0; i--) {
            if (chars[i] == 'Z') {
                chars[i] = 'A';
            } else {
                chars[i]++;
                break;
            }
        }
        return new String(chars);
    }
}
