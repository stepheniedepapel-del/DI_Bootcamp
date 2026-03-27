import time
import requests


def measure_load_time(url: str) -> float:
    """
    Measures the time it takes for a webpage to fully load.
    
    Args:
        url: The URL to test (e.g., 'https://www.google.com')
    
    Returns:
        float: Time in seconds for the complete response
    
    Raises:
        requests.RequestException: If the request fails
    """
    # Record start time
    start_time = time.time()
    
    # Make the HTTP GET request
    response = requests.get(url)
    
    # Raise an exception for bad status codes (4xx, 5xx)
    response.raise_for_status()
    
    # Record end time after complete response is received
    end_time = time.time()
    
    # Calculate elapsed time
    load_time = end_time - start_time
    
    return load_time


def test_multiple_sites(sites: dict[str, str]) -> None:
    """
    Tests load times for multiple websites and displays results.
    
    Args:
        sites: Dictionary with site names as keys and URLs as values
    """
    print("=" * 50)
    print("WEBPAGE LOAD TIME TESTER")
    print("=" * 50)
    
    results = []
    
    for name, url in sites.items():
        try:
            print(f"\nTesting {name} ({url})...")
            load_time = measure_load_time(url)
            results.append((name, load_time, "Success"))
            
            # Format time nicely (milliseconds if fast, seconds if slow)
            if load_time < 1:
                display_time = f"{load_time * 1000:.2f} ms"
            else:
                display_time = f"{load_time:.2f} seconds"
            
            print(f"  ✓ Load time: {display_time}")
            
        except requests.exceptions.HTTPError as e:
            results.append((name, None, f"HTTP Error: {e.response.status_code}"))
            print(f"  ✗ HTTP Error: {e.response.status_code}")
            
        except requests.exceptions.ConnectionError:
            results.append((name, None, "Connection Error"))
            print(f"  ✗ Connection Error: Could not connect to server")
            
        except requests.exceptions.Timeout:
            results.append((name, None, "Timeout"))
            print(f"  ✗ Request timed out")
            
        except requests.exceptions.RequestException as e:
            results.append((name, None, f"Error: {str(e)}"))
            print(f"  ✗ Error: {str(e)}")
    
    # Summary
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    
    successful_results = [(name, time) for name, time, status in results 
                          if status == "Success"]
    
    if successful_results:
        # Sort by load time (fastest first)
        successful_results.sort(key=lambda x: x[1])
        
        print(f"\nFastest site: {successful_results[0][0]} "
              f"({successful_results[0][1]:.3f}s)")
        
        if len(successful_results) > 1:
            print(f"Slowest site: {successful_results[-1][0]} "
                  f"({successful_results[-1][1]:.3f}s)")
            
            avg_time = sum(t for _, t in successful_results) / len(successful_results)
            print(f"Average load time: {avg_time:.3f}s")
    
    # Show any failures
    failures = [(name, status) for name, _, status in results if status != "Success"]
    if failures:
        print(f"\nFailed requests ({len(failures)}):")
        for name, status in failures:
            print(f"  - {name}: {status}")


# ============== TEST SITES ==============

if __name__ == "__main__":
    # Dictionary of sites to test
    test_sites = {
        "Google": "https://www.google.com",
        "Ynet": "https://www.ynet.co.il",
        "IMDB": "https://www.imdb.com",
        "GitHub": "https://www.github.com",
        "Stack Overflow": "https://stackoverflow.com",
        "Python.org": "https://www.python.org"
    }
    
    # Run tests
    test_multiple_sites(test_sites)
    
    # Example of individual usage
    print("\n" + "=" * 50)
    print("INDIVIDUAL TEST EXAMPLE")
    print("=" * 50)
    
    try:
        url = "https://www.google.com"
        time_taken = measure_load_time(url)
        print(f"\nDirect call to measure_load_time('{url}'):")
        print(f"Returned: {time_taken:.4f} seconds")
        print(f"Returned type: {type(time_taken).__name__}")
    except Exception as e:
        print(f"Error: {e}")