# Hex-Tile-Factory
Creating organic looking hexagons with carcassone-ish topology

## Demo
[HERE](ajthinking.github.io/hex-tile-factory)

![hex-tile-factory-optimize-1](https://user-images.githubusercontent.com/3457668/93305912-7501e100-f7ff-11ea-9469-44996d5d9ab0.gif)

## Example

`Tile.fromEncoded('001022')`

<img src="https://user-images.githubusercontent.com/3457668/91667615-4cdb6800-eb06-11ea-9905-715a8db86667.png" width=400>

## Installation

* Currently on a PHP backend...

```bash
git clone https://github.com/ajthinking/hex-tile-factory.git
cd hex-tile-factory
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```
