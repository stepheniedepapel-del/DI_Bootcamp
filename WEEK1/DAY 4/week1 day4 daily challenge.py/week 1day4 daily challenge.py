# Matrix Decoder - Complete Single File Solution
# Topics: Strings, 2D Lists, Loops, Conditionals, String Methods

MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''

def clean_matrix_string(matrix_str):
    """
    Remove empty lines and strip whitespace from the matrix string.
    Returns a list of non-empty rows.
    """
    lines = matrix_str.strip().split('\n')
    # Filter out empty lines and strip whitespace from each row
    return [line.strip() for line in lines if line.strip()]


def create_2d_matrix(rows):
    """
    Convert list of string rows into a 2D list (list of lists).
    Each inner list contains individual characters from that row.
    """
    matrix = []
    for row in rows:
        # Convert each row string into a list of characters
        char_list = list(row)
        matrix.append(char_list)
    return matrix


def get_num_columns(matrix):
    """
    Determine the number of columns in the matrix.
    Assumes all rows have the same length.
    """
    if not matrix:
        return 0
    return len(matrix[0])


def read_columns_top_to_bottom(matrix):
    """
    Read the matrix column by column, from top to bottom.
    Returns a list of strings, where each string is a column read top-to-bottom.
    """
    if not matrix:
        return []
    
    num_rows = len(matrix)
    num_cols = get_num_columns(matrix)
    columns = []
    
    for col in range(num_cols):
        # Build each column by taking the character at this column index from each row
        column_chars = []
        for row in range(num_rows):
            column_chars.append(matrix[row][col])
        columns.append(''.join(column_chars))
    
    return columns


def filter_alpha_with_spaces(column_string):
    """
    Filter alpha characters from a column string.
    Replace groups of non-alpha characters between alpha characters with a single space.
    
    Logic:
    - When we see an alpha char after seeing non-alpha chars (and we've seen alpha before), add space then char
    - When we see consecutive alpha chars, just add them
    - Skip leading non-alpha chars until we see first alpha
    """
    result = []
    seen_alpha = False  # Track if we've encountered any alpha character yet
    pending_space = False  # Track if we need to add a space before next alpha
    
    for char in column_string:
        if char.isalpha():
            # This is an alpha character
            if pending_space and seen_alpha:
                # We had non-alpha chars before this, and we've seen alpha before
                # So add a space separator
                result.append(' ')
            
            result.append(char)
            seen_alpha = True
            pending_space = False
            
        else:
            # This is a non-alpha character (symbol, number, space, etc.)
            if seen_alpha:
                # Only mark for space if we've already seen an alpha char
                # (don't add spaces before the first alpha char)
                pending_space = True
    
    return ''.join(result)


def decode_matrix(matrix_str):
    """
    Main decoding function.
    Steps:
    1. Clean and convert string to 2D list
    2. Read columns top-to-bottom
    3. Filter alpha chars and replace symbols with spaces
    4. Combine into final message
    """
    # Step 1: Transform string into 2D list
    rows = clean_matrix_string(matrix_str)
    matrix = create_2d_matrix(rows)
    
    print("=" * 50)
    print("🔢 MATRIX DECODER INITIATED")
    print("=" * 50)
    print("\n📊 Original Matrix (2D List):")
    for i, row in enumerate(matrix):
        print(f"   Row {i}: {row}")
    
    # Step 2: Process columns (read top to bottom)
    columns = read_columns_top_to_bottom(matrix)
    print(f"\n📋 Reading {len(columns)} columns top-to-bottom:")
    for i, col in enumerate(columns):
        print(f"   Column {i}: '{col}'")
    
    # Step 3 & 4: Filter alpha characters and replace symbols with spaces
    decoded_parts = []
    print(f"\n🔤 Filtering alpha characters:")
    
    for i, col in enumerate(columns):
        filtered = filter_alpha_with_spaces(col)
        decoded_parts.append(filtered)
        print(f"   Column {i}: '{col}' → '{filtered}'")
    
    # Step 5: Construct the secret message
    # Join all decoded column parts with spaces between them
    decoded_message = ' '.join(decoded_parts)
    
    return decoded_message


def main():
    """
    Main execution function.
    Decodes the matrix and displays the secret message.
    """
    # Decode the matrix
    message = decode_matrix(MATRIX_STR)
    
    # Display final result
    print("\n" + "=" * 50)
    print("🔓 SECRET MESSAGE DECODED:")
    print("=" * 50)
    print(f"\n   💬 {message}\n")
    print("=" * 50)
    
    # Optional: Allow user to input custom matrices
    print("\n🎮 Would you like to decode a custom matrix? (yes/no): ", end="")
    choice = input().strip().lower()
    
    if choice in ['yes', 'y']:
        print("\nEnter your matrix (type 'END' on a new line when finished):")
        lines = []
        while True:
            line = input()
            if line.strip().upper() == 'END':
                break
            lines.append(line)
        
        custom_matrix = '\n'.join(lines)
        custom_message = decode_matrix(custom_matrix)
        
        print("\n" + "=" * 50)
        print("🔓 CUSTOM MATRIX DECODED:")
        print("=" * 50)
        print(f"\n   💬 {custom_message}\n")


# Run the decoder
if __name__ == "__main__":
    main()