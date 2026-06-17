import os
from pathlib import Path

# Настройки
EXCLUDE_DIRS = {
    'node_modules', '.venv', 'venv', '__pycache__', '.git', '.idea', 
    'dist', 'build', '.github', 'public'
}

EXCLUDE_FILES = {
    'package-lock.json',  # Огромный файл, не нужен
    'README.md',
    'make_code_doc.py',   # Сам скрипт
    'babel.config.js',
    'jsconfig.json',
    'vue.config.js',
    'webfontloader.js',   # Стандартный плагин
    'index.html',         # Стандартный шаблон
}

# Приоритетные папки (порядок вывода)
PRIORITY_DIRS = [
    # Backend
    'models',
    'repositories', 
    'services',
    'controllers',
    'routers',
    'utils',
    # Frontend
    'src/api',
    'src/store',
    'src/router',
    'src/utils',
    'src/plugins',
    'src/components',
    'src/views',
]

OUTPUT_FILE = 'Код_проекта.txt'

def get_file_priority(filepath):
    """Возвращает приоритет файла (чем меньше, тем раньше)"""
    for i, priority_dir in enumerate(PRIORITY_DIRS):
        if priority_dir in filepath:
            return i
    return len(PRIORITY_DIRS)

def collect_files(root_dir='.'):
    """Собирает все нужные файлы"""
    files = []
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Убираем исключённые папки
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        
        for filename in filenames:
            if filename in EXCLUDE_FILES:
                continue
            
            filepath = os.path.join(dirpath, filename)
            
            # Берём только нужные расширения
            if filepath.endswith(('.py', '.vue', '.js', '.conf', '.yml', '.yaml')):
                # Исключаем сам скрипт
                if filepath.endswith('make_code_doc.py'):
                    continue
                files.append(filepath)
    
    # Сортируем по приоритету, потом по имени
    files.sort(key=lambda f: (get_file_priority(f), f))
    
    return files

def main():
    print("Собираем код проекта Share Moment...")
    
    files = collect_files()
    print(f"Найдено файлов: {len(files)}")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write("ИСХОДНЫЙ КОД ПРОЕКТА SHARE MOMENT\n")
        out.write("=" * 60 + "\n\n")
        
        for filepath in files:
            # Красивый разделитель
            out.write("\n" + "─" * 60 + "\n")
            out.write(f"ФАЙЛ: {filepath}\n")
            out.write("─" * 60 + "\n\n")
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    out.write(content)
                    if not content.endswith('\n'):
                        out.write('\n')
            except Exception as e:
                out.write(f"[Ошибка чтения файла: {e}]\n")
    
    print(f"✅ Готово! Файл '{OUTPUT_FILE}' создан.")
    print(f"📊 Статистика:")
    print(f"   - Всего файлов: {len(files)}")
    
    # Подсчёт строк
    total_lines = 0
    for filepath in files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                total_lines += len(f.readlines())
        except:
            pass
    print(f"   - Всего строк кода: {total_lines}")

if __name__ == '__main__':
    main()