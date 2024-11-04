-- Namn,Kortnamn,ISIN,Kategori,Utdelningspolicy,Årlig avgift, i år,1 år, 3 år, 5 år, 10 år
-- Hållbarhet, Valuta

CREATE TYPE DIVIDEND_POLICY AS ENUM ('ACC', 'DIS');

CREATE TABLE etf (
    ISIN CHAR(12) PRIMARY KEY, --First two country id, then NSIN code, then a final check digit. https://en.wikipedia.org/wiki/International_Securities_Identification_Number
    name TEXT NOT NULL,
    tag CHAR(4) NOT NULL,
    dividend DIVIDEND_POLICY NOT NULL, -- ACC/DIS
    expenseRatio real NOT NULL,
    thisYear real,
    1Year real,
    3Year real,
    5Year real,
    10Year real,
);