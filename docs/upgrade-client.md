# Upgrade Client

## Table of Contents

- [v2 to v3](#core-cms-v2-to-v3)
    1. [Removed](#removed)
    2. [Changed](#changed)
    3. [Added](#added)

## v2 to v3

### Removed

#### `.has-required`

##### `.s-form`

```diff
+ <div>
- <div class="has-required">
    <label for="name">
      Name
      <span>(required)</span>
    </label>
    <input type="text" name="name" id="name" required>
  </div>
```

##### `.c-form`

```diff
+ <div class="c-form__field">
- <div class="c-form__field has-required">
    <label for="name">
      Name
      <span class="c-form__star">(required)</span>
    </label>
    <input type="text" name="name" id="name" required>
  </div>
```

### Added

#### Bootstrap4

- [Forms](https://getbootstrap.com/docs/4.6/components/forms/)
