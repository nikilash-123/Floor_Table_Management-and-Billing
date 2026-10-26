package com.restaruant;

import com.restaruant.Service.Tableservice;
import com.restaruant.cli.Tablecli;

public class Main {
    public static void main(String[] args) {
        Tableservice tableService = new Tableservice();
        Tablecli tableCli = new Tablecli(tableService);
        tableCli.run();
    }
}
