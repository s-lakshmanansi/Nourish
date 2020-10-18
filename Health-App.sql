CREATE TABLE Users ( -- Stores the user information for each individual user
  UserID int PRIMARY KEY AUTO_INCREMENT,
  Username varchar(99) NOT NULL,
  Passwords varchar(99) NOT NULL,
  Email varchar(99) NOT NULL,
  Gender text,
  Age int,
  Height float,
  Weights float
);

CREATE TABLE Nutrition ( -- Stores all the information on record about individual foods
  NID int PRIMARY KEY,
  NameOfFood varchar(100),
  Calories int,
  Saturated_Fat int,
  Trans_Fat int,
  Cholestrol int,
  Sodium int,
  Potassium int, -- Percentage
  Dietary_Fiber int,
  Sugars int, -- Grams
  Protein int, -- Grams
  Vitamin_A int, -- Percentage
  Vitamin_C int, -- Percentage
  Calcium int, -- Percentage
  Iron int -- Percentage
);

CREATE TABLE UserConsumption ( -- Stores consumption of each user
  UserID int REFERENCES Users,
  FoodID int REFERENCES Nutrition,
  FoodName varchar(100) NOT NULL,
  CalculateAmount float
);